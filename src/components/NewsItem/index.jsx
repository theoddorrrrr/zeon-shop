
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const NewsItem = ({ item }) => {

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        if (window.innerWidth >= 768) {
            setIsShow(true)
        }

    }, [])

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) setIsShow(true);
        else setIsShow(false);
    });

    return (
        <div className="news__item" key={item.id}>
            <div className="news__image">
                <img src={item.src} alt="" />
            </div>
            <div className="news__body">
                <div className="news__title">{item.title}</div>
                <div className="news__descriptions">

                    {!isShow ? <div className='news__short'>{item.descriptions}</div> : <div>{item.descriptions}</div>}


                    {!isShow ? (
                        <button
                            className="btn button cart__details-show"
                            onClick={() => setIsShow(true)}
                        >
                            Читать полностью
                        </button>
                    ) : (
                        <button
                            className="btn button cart__details-show"
                            onClick={() => setIsShow(false)}
                        >
                            Скрыть
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewsItem