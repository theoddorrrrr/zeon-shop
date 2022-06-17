import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllGoods } from "../../api/API";
import search from "../../assets/icons/search.png";
import closeBtn from "../../assets/icons/close-btn.png";

const SearchMobile = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState("");

  const goods = useSelector((state) => state.allGoods);
  const newGoods = goods.data.reduce((acc, val) => acc.concat(val), []);

  const [isSearch, setIsSearch] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [isButton, setIsButton] = useState(false);

  const ref = useRef();

  const searchHandler = () => {
    setIsSearch(true);
    setIsShow(true);
    dispatch(fetchAllGoods());
  };

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
    setIsButton(false);
    setIsShow(false);
    navigate(`/collections/${good.collection}/${good.id}`);
  };

  return (
    <>
      <div
        onClick={!isSearch ? searchHandler : undefined}
        className="search search-mobile"
      >
        <div className="search__img">
          {isButton ? (
            <img src={closeBtn} onClick={() => setIsButton(false)} />
          ) : (
            <img src={search} onClick={() => setIsButton(true)} />
          )}
        </div>

        {isButton && isShow && (
          <div className="search__backdrop">
            <div className="search__floating">
              <label>
                <input
                  placeholder="Поиск"
                  onChange={handleFilter}
                  onBlur={() =>
                    setTimeout(() => {
                        // console.log('123');
                    //   setIsShow(false);
                      setIsButton(false);
                    }, 300)
                  }
                  ref={ref}
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
        )}
      </div>
    </>
  );
};

export default SearchMobile;
