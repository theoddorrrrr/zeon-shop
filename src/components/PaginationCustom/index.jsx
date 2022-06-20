import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { List } from '@mui/material';
import more from '../../assets/icons/next.png'
import { useState } from 'react';

export default function Pagination({limit, count, func}) {

  const [siblingCount, setSiblingCount] = useState(window.innerWidth >= 768 ? 1 : 0);

  const goods = Math.ceil(count.length / limit)

  const { items } = usePagination({
    count: goods,
    siblingCount: siblingCount,
  });

  const clickHandler = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => {
      func(page) 
    },500)
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setSiblingCount(1);
    else setSiblingCount(0);
  });

  return (
    <nav className='pagination'>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <button
                type="button"
                
                style={{
                  backgroundColor: selected ? '#333333' : 'white',
                  color: selected ? 'white' : '#676767',
                  border: 'none'
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (    
              <button style={{border:'none', backgroundColor: "white"}}  type="button" {...item} >
                <img src={more} alt="Button" />
              </button>
            );
          }
          

          return <li onClick={() => clickHandler(page)} key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}
