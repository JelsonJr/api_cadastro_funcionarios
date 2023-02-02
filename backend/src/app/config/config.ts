class Config {
    private _dataBaseURL: string = 'mongodb://127.0.0.1:27017/api_cadastro_funcionarios';
    private _url: string = 'http://localhost:3000/'
    private _port: number = 3000;

    public get dataBaseURL() {
        return this._dataBaseURL;
    } 

    public get url() {
        return this._url;
    } 

    public get port() {
        return this._port;
    } 
}

export const config = new Config();