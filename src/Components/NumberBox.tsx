import styled from "@emotion/styled";

const StyledNumberBox = styled.select<{
  num:number;
}>`
  width: 48px;
  height: 48px;
  font-size: 14px;
  border: 1px solid #48aeff;
  color: #48aeff;

  appearance: none;
  padding-left: ${({num}) => num >= 10? 16 : 20}px;

  &:disabled {
    opacity: 1;
  }
`;

const NumberBox = (
  { num, setNum } : {
    num?: number;
    setNum?: (num: number) => void;
  }
) => {

  return <StyledNumberBox num={num ?? 0} value={num ?? "+"} 
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }} 
    disabled={!setNum}
    onChange={(e) => {
      if(setNum) {
        setNum(parseInt(e.currentTarget.value))      
      }
    }}>
    {
      !num? <option>+</option> :
      Array(45).fill(0).map((value, idx) => <option key={idx}>{idx + 1}</option>)
    }
  </StyledNumberBox>
}

export default NumberBox;

