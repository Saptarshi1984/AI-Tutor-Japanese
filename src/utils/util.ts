import hiragana from '@/data/hiragana.json'
import katakana from '@/data/katakana.json'

export type characterType = {
    character:string;
    romaji:string;
    url:string;
}

export function getHiragana():characterType[] {

    return hiragana;
}

export function getKatakana():characterType[] {

    return katakana;
}