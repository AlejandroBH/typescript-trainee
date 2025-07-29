import type {
  Move,
  PokeapiResponse,
} from "../interfaces/pokeapi-response.interface";
import {
  PokeApiAxiosAdapter,
  PokeApiFetchAdapter,
  type HttpAdapter,
} from "../api/pokeApi.adapter";

const API_URL = "https://pokeapi.co/api/v2";

export class Pokemon {
  get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(
    public readonly id: number,
    public name: string,
    // Todo: inyectar dependencias
    private readonly http: HttpAdapter
  ) {}

  scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  async getMoves(): Promise<Move[]> {
    // const { data } = await axios.get<PokeapiResponse>("https://pokeapi.co/api/v2/pokemon/4");
    const data = await this.http.get<PokeapiResponse>(`${API_URL}/pokemon/4`);
    console.log(data.moves);

    return data.moves;
  }
}

const pokeApiAxios = new PokeApiAxiosAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();

export const charmander = new Pokemon(4, "Charmander", pokeApiAxios);

charmander.getMoves();
