import { useEffect, useState } from "react"
import { getRssFeed } from "../api/newsReader"
import { DEVBY, NewsData, ONLINER, Status } from "../interfaces"

export const useDragAndDrop = () => {

    const [isDragging, setIsDragging] = useState(false)
    const [listItems, setListItems] = useState<NewsData[]>([])

    useEffect(() => {

        if (!listItems.length) {
            initData();
        }
    });

    const initData = async (site?: string) => {
        if (!window.localStorage.getItem('favorite')) {
            let map = new Map();
            window.localStorage.setItem('favorite', JSON.stringify(Array.from(map)))
        }
        let storedMap = new Map(JSON.parse(window.localStorage['favorite']));
        const favoriteData = Array.from(storedMap.values()) as NewsData[];

        switch (site) {
            case DEVBY:
                let devbyData = await getRssFeed(DEVBY);
                const items = [...listItems]
                devbyData = devbyData
                    .filter(d => !storedMap.has(d.id))
                    .filter(d => !items.find(dd => dd.id === d.id))
                items.push(...devbyData)
                items.sort((a, b) => a.date.localeCompare(b.date))
                break;
            case ONLINER:
                let onlinerData = await getRssFeed(ONLINER);
                const items1 = [...listItems]
                onlinerData = onlinerData
                    .filter(d => !storedMap.has(d.id))
                    .filter(d => !items1.find(dd => dd.id === d.id))
                items1.push(...onlinerData)
                items1.sort((a, b) => a.date.localeCompare(b.date))

                break;
            default:
                let defaultDevbyData = await getRssFeed(DEVBY);
                let defaultOnlinerData = await getRssFeed(ONLINER);
                let allData = [...defaultOnlinerData.filter((d, i) => !storedMap.has(d.id) && i < 7), ...defaultDevbyData.filter((d, i) => !storedMap.has(d.id) && i < 7), ...favoriteData]
                setListItems(allData);
                break;
        }
    };

    const handleUpdateList = (id: string, status: Status) => {
        let card = listItems.find(item => item.id === id)

        if (card && card.status !== status) {
            let storedMap = new Map(JSON.parse(window.localStorage['favorite']));

            if (card.status === 'favorite') {
                console.log('delete favorite')
                storedMap.delete(card.id)
                window.localStorage['favorite'] = JSON.stringify(Array.from(storedMap));
            }
            card.status = status

            if (status === 'favorite') {
                console.log('add favorite')
                storedMap.set(card.id, card)
                window.localStorage['favorite'] = JSON.stringify(Array.from(storedMap));
            }
            if (Array.isArray(listItems)) {
                setListItems(prev => ([
                    card!,
                    ...prev.filter(item => item.id !== id)
                ]))
            }
        }

    }

    const handleDragging = (dragging: boolean) => setIsDragging(dragging)

    return {
        isDragging,
        listItems,
        handleUpdateList,
        handleDragging,
        refresh: initData,
    }
}