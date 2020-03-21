import React from "react";
import cow from "assets/svg/mini-cow.svg";
import bull from "assets/svg/mini-bull.svg";
import * as S from "./styles";

function Move({
  number = "----",
  result = [2, 2],
  size = "default",
  className,
}) {
  return (
    <S.Wrapper size={size} className={className}>
      <S.Numbers size={size}>
        <S.Data>{number}</S.Data>
      </S.Numbers>
      <S.Results size={size}>
        <S.ResultSlot>
          {result[0]}
          <S.Image size={size} src={cow} />
        </S.ResultSlot>
        <S.ResultSlot>
          {result[1]}
          <S.Image size={size} src={bull} />
        </S.ResultSlot>
      </S.Results>
    </S.Wrapper>
  );
}

export default Move;
