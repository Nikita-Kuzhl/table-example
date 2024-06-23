export interface IUserResponse {
    results: IUser[];
    info: IInfo;
}

export interface IUserReqQuery {
    limit?: number,
    offset?: number,
    search?: string,
    sort?: string,
}

export interface IInfo {
    seed: string;
    results: number;
    page: number;
    version: string;
}

export interface IUser {
    gender: string;
    name: IUserName;
    location: IUserLocation;
    email: string;
    login: IUserLogin;
    dob: IUserDob;
    registered: IUserDob;
    phone: string;
    cell: string;
    id: IUserId;
    picture: IPicture;
    nat: string;
}

export interface IPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface IUserId {
    name: string;
    value: string;
}

export interface IUserDob {
    date: string;
    age: number;
}

export interface IUserLogin {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

export interface IUserLocation {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: IUserCoordinates;
    timezone: IUserTimezone;
}

export interface IUserTimezone {
    offset: string;
    description: string;
}

export interface IUserCoordinates {
    latitude: string;
    longitude: string;
}

export interface Street {
    number: number;
    name: string;
}

export interface IUserName {
    title: string;
    first: string;
    last: string;
}
