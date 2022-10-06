import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import styles from "./Carousel.module.css"


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <div className={styles.contentsBox}>
              <div className={styles.content}>
                <p className={styles.number}>01</p>
                <p className={styles.title}>
                  나에게 필요한 <br /> 좋은 습관으로 고르세요!
                </p>
                <p className={styles.text}>
                  아침기상, 운동, 책읽기, 취미연습까지
                </p>
                <p className={styles.text}>
                  나에게 필요한 작은 미션을 선택하세요🙂
                </p>
                <p className={styles.text}>💡 원하는 챌린지가 없다면</p>
                <p className={styles.text}>
                  '챌린지 개설'로 직접 만들어 보세요.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contentsBox}>
              <div className={styles.content}>
                <p className={styles.number}>02</p>
                <p className={styles.title}>
                  동기부여를 위해서 <br /> 돈을 걸어요💰
                </p>
                <p className={styles.text}>
                  돈을 걸면 의지가 달라집니다.
                </p>
                <p className={styles.text}>
                  챌린지 시작 전 돈을 걸고,
                </p>
                <p className={styles.text}>
                  내가 실천한 만큼 돌려받으면
                </p>
                <p className={styles.text}>끝까지 포기할 수가 없죠😎 </p>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contentsBox}>
              <div className={styles.content}>
                <p className={styles.number}>03</p>
                <p className={styles.title}>
                  좋아하는 인플루언서와 <br /> 함께해보세요!
                </p>
                <p className={styles.text}>
                  함께하면 더욱 더 의미있는
                </p>
                <p className={styles.text}>
                  기부챌린지에 참여해보세요🥰
                </p>
                <p className={styles.text}>원하는 챌린지가 없다면</p>
                <p className={styles.text}>
                  <span style={{ fontWeight:'bold' }}>💕모두가 함께, 행복하도록💕</span>
                </p>
              </div>
            </div>
          </div>
        </Slider>

      </div>
    );
  }
}
