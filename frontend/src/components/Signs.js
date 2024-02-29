import React from 'react';
import { Link } from 'react-router-dom';

function Signs({
  header,
  children,
  buttonText,
  linkSpan,
  linkSpanText,
  onSubmit,
}) {
  return (
    <form className='sign' onSubmit={onSubmit}>
      <h3 className='sign__title'>{header}</h3>
      <div className='sign__input-container'>{children}</div>
      <button className='sign__submit-button' type='submit' onSubmit={onSubmit}>
        {buttonText}
      </button>
      <Link to={linkSpan} className='sign__link-span'>
        {linkSpanText}
      </Link>
    </form>
  );
}

export default Signs;
