type UrlSring = URL | string;

interface SourceUrl {
  url: UrlSring;
}

interface ImageSource extends SourceUrl {
  description: string;
}

interface ImageAuthor extends SourceUrl {
  name: string;
}

interface ImageAttribution {
  author: ImageAuthor;
  source: ImageSource;
}

interface StoryImage {
  url: UrlSring;
  attribution?: ImageAttribution;
}

export interface Story {
  id: number;
  hint: string;
  title: string;
  color?: string;
  image?: StoryImage;
  imdbUrl?: UrlSring;
}
