export interface Prueba {
    id?:               string;
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    cantidad:number;
}
export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}