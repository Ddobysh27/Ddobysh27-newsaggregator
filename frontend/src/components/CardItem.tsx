import { NewsData } from "../interfaces"

interface Props {
    newsData: NewsData,
    handleDragging: (dragging: boolean) => void
}

export const CardItem = ({ newsData, handleDragging }: Props) => {

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', `${newsData.id}`)
        handleDragging(true)
    }
    const handleDragEnd = () => handleDragging(false)

    const newLocal = "_blank"

    return (
        <div
            className='card-container'
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="tooltip">
                <p>
                    <img src={newsData.image} height="200" alt="" />
                </p>
                <p>{newsData.text}</p>
                <a href={newsData.link} target={newLocal} className="tooltiptext">{newsData.link}</a>
            </div>

        </div>
    )
}