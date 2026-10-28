export interface VideoFrame {
  id: number;
  imageUrl: string;
  startTime: number;
  endTime: number;
  segment: 'hook' | 'context' | 'data' | 'twist' | 'cta';
  subtitles: {
    text: string;
    startTime: number;
    endTime: number;
  }[];
}

export interface DemoVideo {
  id: string;
  title: string;
  topic: string;
  format: string;
  totalDuration: number;
  frames: VideoFrame[];
}

export const demoVideos: DemoVideo[] = [
  {
    id: 'us-debt',
    title: 'Рост госдолга США',
    topic: 'Государственный долг США достиг $35 триллионов',
    format: 'шок-цифра',
    totalDuration: 35,
    frames: [
      {
        id: 1,
        imageUrl: 'https://image.qwenlm.ai/generated-images/2a695cd5-cbcc-4bf0-b4c0-d746c74be45c/_result.png',
        startTime: 0,
        endTime: 1.5,
        segment: 'hook',
        subtitles: [
          { text: 'Эта страна должна', startTime: 0, endTime: 0.8 },
          { text: '$2.4 ТРИЛЛИОНА', startTime: 0.8, endTime: 1.5 },
        ],
      },
      {
        id: 2,
        imageUrl: 'https://image.qwenlm.ai/generated-images/ad75d07d-150a-406e-a6bb-6ea18ac16581/_result.png',
        startTime: 1.5,
        endTime: 8,
        segment: 'context',
        subtitles: [
          { text: 'И это не Китай,', startTime: 1.5, endTime: 3.2 },
          { text: 'и не Япония.', startTime: 3.2, endTime: 4.5 },
          { text: 'Давайте разберёмся,', startTime: 4.5, endTime: 6.2 },
          { text: 'откуда взялась эта цифра.', startTime: 6.2, endTime: 8 },
        ],
      },
      {
        id: 3,
        imageUrl: 'https://image.qwenlm.ai/generated-images/a10e148b-374f-43dd-b761-665b81a668fe/_result.png',
        startTime: 8,
        endTime: 16,
        segment: 'data',
        subtitles: [
          { text: 'По данным Всемирного банка,', startTime: 8, endTime: 10.5 },
          { text: 'за последние десять лет', startTime: 10.5, endTime: 12.8 },
          { text: 'государственный долг США', startTime: 12.8, endTime: 14.5 },
          { text: 'вырос с $18 до $35 триллионов.', startTime: 14.5, endTime: 16 },
        ],
      },
      {
        id: 4,
        imageUrl: 'https://image.qwenlm.ai/generated-images/f89aa7a9-78c2-4eb2-88ac-3bb2d528e3b2/_result.png',
        startTime: 16,
        endTime: 25,
        segment: 'data',
        subtitles: [
          { text: 'Это почти вдвое больше,', startTime: 16, endTime: 18.5 },
          { text: 'чем весь ВВП России.', startTime: 18.5, endTime: 20.8 },
          { text: 'Каждый год долг растёт', startTime: 20.8, endTime: 23 },
          { text: 'на $2 триллиона.', startTime: 23, endTime: 25 },
        ],
      },
      {
        id: 5,
        imageUrl: 'https://image.qwenlm.ai/generated-images/18b05466-f383-4e46-a64f-91c17daa01c7/_result.png',
        startTime: 25,
        endTime: 32,
        segment: 'twist',
        subtitles: [
          { text: 'Но вот что действительно удивительно:', startTime: 25, endTime: 28 },
          { text: 'на каждого американца', startTime: 28, endTime: 30 },
          { text: 'приходится по $70 000 долга.', startTime: 30, endTime: 32 },
        ],
      },
      {
        id: 6,
        imageUrl: 'https://image.qwenlm.ai/generated-images/26233c4c-62bb-42b1-9eb3-0b66601b4a50/_result.png',
        startTime: 32,
        endTime: 35,
        segment: 'cta',
        subtitles: [
          { text: 'Подпишись —', startTime: 32, endTime: 33.5 },
          { text: 'завтра будет ещё безумнее.', startTime: 33.5, endTime: 35 },
        ],
      },
    ],
  },
  {
    id: 'earth-population',
    title: 'Население Земли',
    topic: 'Население планеты достигло 8 миллиардов',
    format: 'шок-цифра',
    totalDuration: 33,
    frames: [
      {
        id: 1,
        imageUrl: 'https://image.qwenlm.ai/generated-images/9c4d7345-999d-48fa-971b-86a8a5c3bf51/_result.png',
        startTime: 0,
        endTime: 2,
        segment: 'hook',
        subtitles: [
          { text: 'Нас уже', startTime: 0, endTime: 0.8 },
          { text: '8 МИЛЛИАРДОВ', startTime: 0.8, endTime: 2 },
        ],
      },
      {
        id: 2,
        imageUrl: 'https://image.qwenlm.ai/generated-images/1e666710-2ec4-4b10-916c-2380fe7ed404/_result.png',
        startTime: 2,
        endTime: 8,
        segment: 'context',
        subtitles: [
          { text: 'И эта цифра растёт', startTime: 2, endTime: 4 },
          { text: 'каждую секунду.', startTime: 4, endTime: 6 },
          { text: 'Давайте посмотрим,', startTime: 6, endTime: 8 },
        ],
      },
      {
        id: 3,
        imageUrl: 'https://image.qwenlm.ai/generated-images/42d04622-2903-4ca8-9532-2a751a838f59/_result.png',
        startTime: 8,
        endTime: 17,
        segment: 'data',
        subtitles: [
          { text: 'В Азии живёт 4.7 миллиарда,', startTime: 8, endTime: 11 },
          { text: 'в Африке — 1.4 миллиарда.', startTime: 11, endTime: 14 },
          { text: 'В Европе — всего 750 миллионов.', startTime: 14, endTime: 17 },
        ],
      },
      {
        id: 4,
        imageUrl: 'https://image.qwenlm.ai/generated-images/a10e148b-374f-43dd-b761-665b81a668fe/_result.png',
        startTime: 17,
        endTime: 25,
        segment: 'data',
        subtitles: [
          { text: 'Каждый день рождается', startTime: 17, endTime: 19.5 },
          { text: '385 000 человек.', startTime: 19.5, endTime: 21.5 },
          { text: 'Это как целый город', startTime: 21.5, endTime: 23.5 },
          { text: 'за одни сутки.', startTime: 23.5, endTime: 25 },
        ],
      },
      {
        id: 5,
        imageUrl: 'https://image.qwenlm.ai/generated-images/18b05466-f383-4e46-a64f-91c17daa01c7/_result.png',
        startTime: 25,
        endTime: 30,
        segment: 'twist',
        subtitles: [
          { text: 'Но вот что удивительно:', startTime: 25, endTime: 27.5 },
          { text: 'к 2100 году нас будет', startTime: 27.5, endTime: 29 },
          { text: 'уже 10.4 миллиарда.', startTime: 29, endTime: 30 },
        ],
      },
      {
        id: 6,
        imageUrl: 'https://image.qwenlm.ai/generated-images/26233c4c-62bb-42b1-9eb3-0b66601b4a50/_result.png',
        startTime: 30,
        endTime: 33,
        segment: 'cta',
        subtitles: [
          { text: 'Подпишись —', startTime: 30, endTime: 31.5 },
          { text: 'завтра ещё интереснее.', startTime: 31.5, endTime: 33 },
        ],
      },
    ],
  },
];
