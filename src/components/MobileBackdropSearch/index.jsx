import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import search from "../../assets/icons/search.png";

const MobileBackdropSearch = ({ setIsShow, isButton, setIsButton }) => {
    let navigate = useNavigate();

    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState("");

    const goods = useSelector((state) => state.allGoods);
    const newGoods = goods.data.reduce((acc, val) => acc.concat(val), []);


    const ref = useRef();

    const handleFilter = (e) => {
        setData(e.target.value);
        setIsShow(true);

        const newData = newGoods.filter((value) => {
            return value.title
                .toLowerCase()
                .trim()
                .includes(e.target.value.toLowerCase().trim());
        });

        e.target.value === ""
            ? setFilteredData([]) && setIsShow(false)
            : setFilteredData(newData);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            navigateHandler();
        }
    };

    const navigateHandler = () => {
        if (ref.current.value !== "") {
            navigate(`/search-page`, { state: { filteredData, data } });
            ref.current.value = "";
            setIsShow(false);
            setIsButton(false);
        }
    };

    const itemHandler = (good) => {
        navigate(`/collections/${good.collection}/${good.id}`);
        ref.current.value = "";
        setIsButton(false);
        setIsShow(false);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [])


    return (
        <div className="search__backdrop">
            <div className="search__floating">
                <label>
                    <input
                        placeholder="Поиск"
                        onChange={handleFilter}
                        onBlur={() =>
                            setTimeout(() => {
                                setIsShow(false);
                                setIsButton(false);
                            }, 1)
                        }
                        ref={ref}
                        autoFocus
                        onKeyDown={(e) => handleKeyPress(e)}
                        tabIndex="0"
                    ></input>
                    <div className="search__img">
                        <img src={search} onClick={() => setIsButton(true)} />
                    </div>
                </label>
                <>
                    {goods.loading ? (
                        <></>
                    ) : (
                        filteredData.length > 1 &&
                        isButton && (
                            <div className="search-result search-result-mobile">
                                <div className="search__items">
                                    {filteredData.map((good) => {
                                        return (
                                            <div
                                                onClick={() => itemHandler(good)}
                                                className="search__item"
                                                key={good.id}
                                            >
                                                {good.title}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    )}
                </>
            </div>
        </div>
    )
}

export default MobileBackdropSearch