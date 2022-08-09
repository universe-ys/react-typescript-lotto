import styled from '@emotion/styled';
import React, { useState } from 'react';
import Button from './Components/Button';
import NumberBox from './Components/NumberBox';
import Title from './Components/Title';

const NumberBoxContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

function getRank(resNum:[number, number, number, number, number, number, number], 
  num: [number, number, number, number, number, number]) {
    const isBonus = num.includes(resNum[6]);
    
    resNum.splice(6, 1)

    let matchedNum = 0;

    for (const value of num) {
      if(resNum.includes(value)) {
        matchedNum++;
      }
    }
    switch (matchedNum) {
      case 6:
        return "1등 입니다!";
      case 5:
        return isBonus? "2등 입니다!" : "3등 입니다!";
      case 4:
        return "4등 입니다!";
      case 3:
        return "5등 입니다!";
      default:
        return "낙첨";
    }
}

function App() {

  const [num, setNum] = useState<
    [number, number, number, number, number, number, number]>([1, 2, 3, 4, 5, 6, 7]);

  const [ranNum, setRanNum] = useState<
    [number, number, number, number, number, number] | null>(null);


  return (
    <div className="App" style={{margin: "24px"}}>
      <Title>
        정답 번호
      </Title>

      <NumberBoxContainer>
        {
          Array(8).fill(1).map((_, idx) => {
            
            if(idx === 6) {
              return <NumberBox />
            }
            
            if(idx === 7) {
              idx = 6;
            }

            return <NumberBox num={num[idx]} setNum={(value) => {
            
              if(num.includes(value)){
                return;
              }
            
              setNum(prev => {
                prev[idx] = value
                return [...prev];
              })
            
            }} /> 
          })
        }
      </NumberBoxContainer>

      <div style={{height:120}}></div>
      <Button onClick={() => {
        const li:number[] = []

        while(li.length < 6) {
          const v = Math.floor((Math.random() * 45) + 1);

          if (li.includes(v)) {
            continue;
          } else {
            li.push(v) 
          }
        }

        setRanNum(li as [number, number, number, number, number, number]) 
        
      }}>랜덤 번호 추첨</Button>

      {
        ranNum && 
        <>
          <div style={{height:24}}></div>
          <Title>
            번호 추첨 결과
          </Title>

          <NumberBoxContainer>
            {
              Array(6).fill(1).map((_, idx) =>  <NumberBox num={ranNum[idx]} /> )
            }
          </NumberBoxContainer>

          <div style={{height:40}}></div>

          <Title>
            {
              getRank([...num], [...ranNum])
            }
          </Title> 
        </>
      }
      
    </div>
  );
}

export default App;
