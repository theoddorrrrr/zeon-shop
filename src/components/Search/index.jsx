import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllGoods } from "../../api/API";
import search from "../../assets/icons/search.png";

const Search = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState("");

  const goods = useSelector((state) => state.allGoods);
  const newGoods = goods.data.reduce((acc, val) => acc.concat(val), []);

  const [isSearch, setIsSearch] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const ref = useRef();

  const searchHandler = () => {
    setIsSearch(true);
    setIsShow(true);
    dispatch(fetchAllGoods());
  };

  const handleFilter = (e) => {
    setData(e.target.value);
    const newData = newGoods.filter((value) => {
      return value.title.toLowerCase().includes(data.toLowerCase());
    });

    data === "" || data === " "
      ? setFilteredData([])
      : setFilteredData(newData);
  };

  const navigateHandler = (e) => {
    e.preventDefault();

    if (ref.current.value !== "") {
      navigate(`/search-page`, { state: { filteredData, data } });
      ref.current.value = "";
      setIsShow(false);
    }
  };

  console.log(filteredData);

  const itemHandler = (good) => {
    setIsShow(false);
    console.log(good)
    navigate(`/collections/${good.collection}/${good.id}`);
  };

  return (
    <>
      <div onClick={!isSearch ? searchHandler : undefined} className="search">
        <label>
          <input
            placeholder="Поиск"
            onChange={handleFilter}
            onBlur={() => setTimeout(() => setIsShow(false), 300)}
            ref={ref}
            onClick={() => setIsShow(true)}
          ></input>
          <div className="search__img" onClick={navigateHandler}>
            <img src={search} />
          </div>
        </label>
        <>
          {goods.loading ? (
            <></>
          ) : (
            filteredData.length > 1 &&
            isShow && (
              <div className="search-result">
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
    </>
  );
};

export default Search;
