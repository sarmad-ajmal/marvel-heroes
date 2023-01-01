export interface IHero {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Comics;
  stories: Stories;
  events: Comics;
  urls: Url[];
}

interface Url {
  type: string;
  url: string;
}

interface Stories {
  available: number;
  collectionURI: string;
  items: IStoriesItems[];
  returned: number;
}

interface IStoriesItems {
  resourceURI: string;
  name: string;
  type: string;
}

interface Comics {
  available: number;
  collectionURI: string;
  items: IComicsItems[];
  returned: number;
}

interface IComicsItems {
  resourceURI: string;
  name: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}