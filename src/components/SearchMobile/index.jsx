import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllGoods } from "../../api/API";
import search from "../../assets/icons/search.png";
import closeBtn from "../../assets/icons/close-btn.png";
import MobileBackdropSearch from "../MobileBackdropSearch";

const SearchMobile = () => {
  const dispatch = useDispatch();

  const [isSearch, setIsSearch] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [isButton, setIsButton] = useState(false);

  const searchHandler = () => {
    setIsSearch(true);
    setIsShow(true);
    dispatch(fetchAllGoods());
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
            <img src={search} onClick={() => setIsButton(true) } />
          )}
        </div>

        {isButton  && (
          <MobileBackdropSearch setIsShow={setIsShow} isButton={isButton} setIsButton={setIsButton} />
        )}
      </div>
    </>
  );
};

export default SearchMobile;
