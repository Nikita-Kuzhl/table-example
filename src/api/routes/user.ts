// Types
import type {Request, Response} from "express";
import type {IUserResponse, IUser, IUserReqQuery} from "@/types/user.ts";
// Utils
import {getPaginatedData, searchNestedObjArray,  sortByKeys} from "@/utils/api.ts";
// Mock
import mockUser from '@/assets/mock/api.json';

const defaultParams: IUserReqQuery = {
    limit: 20,
    offset: 0,
    search: '',
    sort: '',
};

export const getUser = (req: Request, res: Response) => {
    try{
        const queryParams = {...defaultParams,...req.query};

        const sendData =  JSON.parse(JSON.stringify(mockUser)) as IUserResponse;

        // Поиск
        if (queryParams.search){
            sendData.results = searchNestedObjArray<IUser>(sendData.results, queryParams.search, [
                // ФИО
                'name.title',
                'name.first',
                'name.last',
                // Пол
                'gender',
                // Страна,
                'location.country',
                // Дата рождения
                'dob.date',
                'email',
                'phone'
            ]);
        }
        // Вывод общего кол-ва записей при фильтрации
        sendData.info.results = sendData.results.length;
        // Сортировка по полям
        if(queryParams.sort){
            const keyForValue = {
                fio: ['name.last', 'name.first'],
                gender: ['gender'],
                location: ['location.country'],
                date: ['dob.date'],
                email: ['email'],
                phone: ['phone'],
            };
            // eslint-disable-next-line no-prototype-builtins
            if(keyForValue?.hasOwnProperty(queryParams.sort.replace('-',''))) {
                sendData.results = sortByKeys(sendData.results, keyForValue[queryParams.sort?.replace('-','') as keyof typeof keyForValue], !queryParams.sort.includes('-'));
            }

        }
        // Пагинация
        sendData.results = getPaginatedData<IUser>(sendData.results, Number(queryParams.offset), Number(queryParams.limit));

        res.send(sendData);
    }catch (err){
        console.error('[API/getUser] - ', err);
        res.status(500).send(`[API/getUser] - ${err}`);
    }
};
