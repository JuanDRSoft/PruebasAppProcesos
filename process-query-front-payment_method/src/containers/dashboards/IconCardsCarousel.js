/* eslint-disable react/no-array-index-key */
import React from 'react';
import IconCard from 'components/cards/IconCard';
import { Col, Row } from 'reactstrap';

const IconCardsCarousel = ({ className = 'icon-cards-row', data }) => {
  return (
    <div className={className}>
      <Row className='mb-5'>
        {data.map((item, index) => {
          return (
            <Col xxs='3' key={`icon_card_${index}`}>
              <div>
                <IconCard {...item} count={1} className='mb-4' />
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
export default IconCardsCarousel;
