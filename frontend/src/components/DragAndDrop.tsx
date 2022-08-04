import { useDragAndDrop } from "../hooks/useDragAndDrop"
import { Status } from "../interfaces"
import { ContainerCards } from "./ContainerCards"


const typesHero: Status[] = ['devby', 'onliner', 'favorite']


export const  DragAndDrop = () => {
    let { isDragging, listItems, handleDragging, handleUpdateList, refresh } = useDragAndDrop()

    return (
        <div className="grid">
            {
                typesHero.map(container => (
                    <ContainerCards
                        items={listItems}
                        status={container}
                        key={container}

                        isDragging={isDragging}
                        handleDragging={handleDragging}
                        handleUpdateList={handleUpdateList}
                        refresh = {refresh}
                    />
                ))
            }
        </div>
    )
}

export default DragAndDrop;