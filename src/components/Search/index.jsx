import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllGoods } from "../../api/API";
import search from "../../assets/icons/search.png";

const Search = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const goods = useSelector((state) => state.allGoods);
  console.log(goods);
  const newGoods = goods.data.reduce((acc, val) => acc.concat(val), []);

  const [isSearch, setIsSearch] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [filteredData, setFilteredData] = useState([])

  const searchHandler = () => {
    setIsSearch(true);
    setIsShow(false);
    dispatch(fetchAllGoods());
  };

  const toggleHandler = () => {
    console.log(111);
  };

  const handleFilter = (e) => {
    const data = e.target.value
    console.log(data);
    const newData = newGoods.filter(value => {
        return value.title.includes(data)
    })
    setFilteredData(newData)
  }

  console.log(filteredData);


//   console.log(isShow);

  return (
    <>
      <div
        onClick={!isSearch ? searchHandler : () => setIsShow(!isShow)}
        className="search"
      >
        <label onClick={() => setIsShow(!isShow)}>
          <input placeholder="Поиск" onChange={handleFilter}></input>
          <div className="search__img">
            <img src={search} onClick={toggleHandler} />
          </div>
        </label>
        <>
          {goods.loading ? (
            <></>
          ) : (
            !isShow && filteredData.length !== 0 && (
              <div className="search-result">
                <div className="search__items">
                  {filteredData.map((good) => {
                    return (
                        <a
                          onClick={() =>
                            navigate(
                              `/collections/${good.collection}/${good.id}`
                            )
                          }
                          className="search__item"
                          key={good.id}
                        >
                          {good.title}
                        </a>
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
