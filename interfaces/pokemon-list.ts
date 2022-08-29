export interface PokemonListResponse {
    count:    number;
    next?:     string;
    previous?: string;
    results:  PokemonMininalObject[];
}

export interface PokemonMininalObject {
    name: string;
    url:  string;
    id: string;
    image: string;
}
