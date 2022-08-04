import { useState } from "react"
import { DEVBY, NewsData, ONLINER, Status } from "../interfaces"
import { CardItem } from "./CardItem"
import { LinkPreview } from '@dhaiwat10/react-link-preview';


interface Props {
    items: NewsData[]
    status: Status
    isDragging: boolean
    handleUpdateList: (id: string, status: Status) => void
    handleDragging: (dragging: boolean) => void
    refresh: (site?: string) => void
}

export const ContainerCards = ({ items = [], status, isDragging, handleDragging, handleUpdateList, refresh }: Props) => {

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleUpdateList(e.dataTransfer.getData('text'), status)
        handleDragging(false)
    }

    const handleOnlinerSubmit = () => {
        console.log('handleOnlinerSubmit')
        refresh(ONLINER)

    }

    const handleDevbySubmit = () => {
        console.log('handleOnlinerSubmit')
        refresh(DEVBY)
    }

    const clearLocalStorage = () => {
        console.log('clearLocalStorage')
        window.localStorage.clear();
        refresh()
    }

    const [show, setShow] = useState(false);
    const [url, setUrl] = useState("");
    const [left, setLeft] = useState("");
    const [top, setTop] = useState("");

    const onClick = (e: any, link: string) => {
        setLeft(e.clientX)
        setTop(e.clientY)
        setUrl(link)
        setShow(true)
        console.log(e)
    }

    const onCloseClick = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setShow(false)
        console.log(e)
    }


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

    return (
        <div
            className={`layout-cards ${isDragging ? 'layout-dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}

        >
            <p>{status} news</p>

            {status === 'devby' ? <button type="button" onClick={handleDevbySubmit} value={status}>Update {status}</button> : ''}
            {status === 'onliner' ? <button type="button" onClick={handleOnlinerSubmit} value={status}>Update {status}</button> : ''}
            {status === 'favorite' ? <button type="button" onClick={clearLocalStorage} value={status}>Clear {status}</button> : ''}


            {
                items.map(item => (
                    status === item.status

                    && <div onClick={event => onClick(event, item.id)} key={item.id}>
                        <CardItem
                            newsData={item}
                            
                            handleDragging={handleDragging}
                        /></div>
                ))
            }
            <div className="preview123" style={{ display: show ? 'block' : 'none', left, top }} >
                <div className="buttons">
                    <button type="button" onClick={event => onCloseClick(event)}>Close</button>
                    <button>Add to Favorite</button>
                </div>
                <LinkPreview url={url} width='400px' />

            </div>
        </div>
    )
}