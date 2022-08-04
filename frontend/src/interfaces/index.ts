export type Status = 'devby' | 'onliner' | 'favorite'

export interface NewsData {
    id: string
    image: string
    text: string
    link: string
    html: string
    date: string
    status: Status
}
export const DEVBY = 'https://devby.io/rss'
export const ONLINER = 'https://tech.onliner.by/feed'