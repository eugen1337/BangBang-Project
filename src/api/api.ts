import { OSMData } from 'src/types/globalTypes';
import { autorizationAIUrl, mapUrl, osmUrl } from './urls';

type Params = {
  [key: string]: string;
};

const defaultParams: Params = {
  format: 'json',
};

const uuid = '58ec0646-6b08-45f6-aa3b-dad2fc5792b0';

const text =
  'Предоставь мне информацию о следующем здании в таком формате:' +
  '• дата постройки или ввода в эксплуатацию' +
  '• архитектор' +
  '• краткая историческая справка.' +
  'Если нет гарантированной достоверности ответа - ответь Null' +
  'Отввет должен быть максимально конкретным, требующим высокую достоверность, форматирование' +
  'и ограничение количества символов в ответе';

class Api {
  token = '';
  async fetchOSMData({
    lat,
    lon,
    parameters,
  }: {
    lat: string;
    lon: string;
    parameters?: Params;
  }): Promise<OSMData> {
    const params = parameters
      ? { ...defaultParams, ...parameters }
      : defaultParams;

    const url = `${osmUrl}/reverse?lat=${lat}&lon=${lon}&${new URLSearchParams(params).toString()}`;
    const response = await (await fetch(url)).json();
    console.log(response);

    const data = {
      osm_type: response.osm_type,
      osm_id: response.osm_id,
    };

    return data;
  }

  async fetchMap(osmData: OSMData) {
    const url = `${mapUrl}/${osmData.osm_type}/${osmData.osm_id}.json`;
    // console.log(url);

    const response = await (await fetch(url)).json();
    // console.log(response);

    return response;
  }

  async getToken() {
    const token = await (
      await fetch(autorizationAIUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          RqUID: uuid,
          Authorization: 'Basic authorization_key',
        },
        body: new URLSearchParams({
          scope: 'GIGACHAT_API_PERS',
        }).toString(),
      })
    ).text();
    this.token = token;
    console.log(token);
  }

  async fetchAI(osmData: OSMData) {
    const token = await (
      await fetch(autorizationAIUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',

          Authorization: `Bearer ${this.token}`,
        },
        body: new URLSearchParams({
          scope: 'GIGACHAT_API_PERS',
        }).toString(),
      })
    ).json();
  }
}

const mapApi = new Api();

export { mapApi };
