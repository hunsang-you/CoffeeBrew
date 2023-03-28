import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import Logo from '../../assets/Coffeebrew.svg';
// 검색창
const SearchDiv = tw.div`flex flex-col text-center `;
const SearchBtn = tw.button`w-20 h-12 bg-black text-white rounded-full mx-4 mt-10`;
const SearchDetailBtn = tw.button`w-20 h-12 bg-black text-white rounded-xl mt-4 mx-auto`;
const SearchDetail = tw.div`w-720 min-h-full border-4 rounded-3xl border-y-brownBorder mx-auto mt-4 drop-shadow-lg `;
const CheckKeyword = tw.button`w-20 border-4 border-nameColor text-black rounded-2xl ml-4 mr-4 mt-2 mb-2 font-bold `;
const CheckedKeyword = tw.button`w-20 border-4 border-nameColor bg-nameColor text-white rounded-2xl ml-4 mr-4 mt-2 mb-2 font-bold  `;

const KeywordTitle = tw.div`w-20 text-xl font-bold mx-auto my-auto break-words`;
const KeywordGroup = tw.div`w-592 mx-auto border-4 border-recMachine2 rounded-2xl flex `;

const SearchBar = () => {
  interface KeywordState1 {
    [key: string]: boolean;
    keyword1: boolean;
    keyword2: boolean;
    keyword3: boolean;
    keyword4: boolean;
    keyword5: boolean;
    keyword6: boolean;
    keyword7: boolean;
  }

  interface KeywordState2 {
    [key: string]: boolean;
    keyword1: boolean;
    keyword2: boolean;
    keyword3: boolean;
    keyword4: boolean;
    keyword5: boolean;
    keyword6: boolean;
    keyword7: boolean;
  }

  interface MoreState {
    morebtn1: boolean;
    morebtn2: boolean;
  }

  // 상세검색 on off
  const [isActive, setIsActive] = useState(false);

  const handleDetail = (): void => {
    setIsActive(!isActive);
  };

  // 검색 단어
  const [textWord, setTextWord] = useState('');
  const ChangeText = (e: any) => {
    setTextWord(e.target.value);
    console.log(textWord);
  };
  // 단어 전송
  const SendWord = (e: any) => {
    // 엔터 and 검색 버튼 클릭시 전송
    console.log(textWord);
  };

  // 상세검색 키워드 관리
  // 키워드 on off
  const [isKeywordState1, setIsKeywordState1] = useState<KeywordState1>({
    keyword1: false,
    keyword2: false,
    keyword3: false,
    keyword4: false,
    keyword5: false,
    keyword6: false,
    keyword7: false,
  });

  const [isKeywordState2, setIsKeywordState2] = useState<KeywordState2>({
    keyword1: false,
    keyword2: false,
    keyword3: false,
    keyword4: false,
    keyword5: false,
    keyword6: false,
    keyword7: false,
  });

  const handleKeyword1 = (keyword: keyof KeywordState1 | string): void => {
    if (typeof keyword === 'string' && keyword.startsWith('keyword')) {
      setIsKeywordState1({
        ...isKeywordState1,
        [keyword]: !isKeywordState1[keyword as keyof KeywordState1],
      });
    }
  };
  const handleKeyword2 = (keyword: keyof KeywordState1 | string): void => {
    if (typeof keyword === 'string' && keyword.startsWith('keyword')) {
      setIsKeywordState2({
        ...isKeywordState2,
        [keyword]: !isKeywordState2[keyword as keyof KeywordState1],
      });
    }
  };
  // 항목 더보기 on off
  const [isMoreState, setIsMoreState] = useState<MoreState>({
    morebtn1: false,
    morebtn2: false,
  });

  const handleMoreBtn1 = () => {
    setIsMoreState({
      ...isMoreState,
      morebtn1: !isMoreState.morebtn1,
    });
  };

  const handleMoreBtn2 = () => {
    setIsMoreState({
      ...isMoreState,
      morebtn2: !isMoreState.morebtn2,
    });
  };

  // 예시
  const keywordsFruits = {
    1: '감귤',
    2: '사과',
    3: '열대과일',
    4: '베리',
    5: '말린 과일',
    6: '멜론',
    7: '포도',
  };

  const keywordsNuts = {
    1: '아몬드',
    2: '헤이즐넛',
    3: '땅콩',
    4: '보리',
    5: '호밀',
    6: '스모키',
    7: '맥아',
  };

  // 첫번째(keywordsFruits) 렌더링
  const SelectKeyword1 = () => {
    const keywordEntries = Object.entries(keywordsFruits);

    return keywordEntries.map(([key, value]: string[]) => {
      for (let i = 0; i < Object.keys(keywordsFruits).length + 1; i++) {
        if (isMoreState.morebtn1 === false && parseInt(key) === i && i < 5) {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
              {isKeywordState1['keyword' + key] ? (
                <CheckedKeyword
                  key={value}
                  onClick={() => handleKeyword1('keyword' + key)}
                >
                  {value}
                </CheckedKeyword>
              ) : (
                <CheckKeyword
                  key={value}
                  onClick={() => handleKeyword1('keyword' + key)}
                >
                  {value}
                </CheckKeyword>
              )}
            </div>
          );
        } else if (
          isMoreState.morebtn1 === true &&
          parseInt(key) === i &&
          i > 0
        ) {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
              {isKeywordState1['keyword' + key] ? (
                <CheckedKeyword
                  key={value}
                  onClick={() => handleKeyword1('keyword' + key)}
                >
                  {value}
                </CheckedKeyword>
              ) : (
                <CheckKeyword
                  key={value}
                  onClick={() => handleKeyword1('keyword' + key)}
                >
                  {value}
                </CheckKeyword>
              )}
            </div>
          );
        }
      }
    });
  };

  // 두번째(keywordsNuts) 렌더링
  const SelectKeyword2 = () => {
    const keywordEntries = Object.entries(keywordsNuts);

    return keywordEntries.map(([key, value]: string[]) => {
      for (let i = 0; i < Object.keys(keywordsNuts).length + 1; i++) {
        if (isMoreState.morebtn2 === false && parseInt(key) === i && i < 5) {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
              {isKeywordState2['keyword' + key] ? (
                <CheckedKeyword
                  key={value}
                  onClick={() => handleKeyword2('keyword' + key)}
                >
                  {value}
                </CheckedKeyword>
              ) : (
                <CheckKeyword
                  key={value}
                  onClick={() => handleKeyword2('keyword' + key)}
                >
                  {value}
                </CheckKeyword>
              )}
            </div>
          );
        } else if (
          isMoreState.morebtn2 === true &&
          parseInt(key) === i &&
          i > 0
        ) {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
              {isKeywordState2['keyword' + key] ? (
                <CheckedKeyword
                  key={value}
                  onClick={() => handleKeyword2('keyword' + key)}
                >
                  {value}
                </CheckedKeyword>
              ) : (
                <CheckKeyword
                  key={value}
                  onClick={() => handleKeyword2('keyword' + key)}
                >
                  {value}
                </CheckKeyword>
              )}
            </div>
          );
        }
      }
    });
  };

  return (
    <SearchDiv>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* <AiOutlineSearch
          size={50}
          style={{
            marginRight: '16px',
            marginTop: '2.5rem',
          }}
        /> */}
        <img src={Logo} alt="Logo" width={100} style={{ marginTop: '24px' }} />
        <TextField
          id="outlined-basic"
          label="원두 혹은 원산지를 입력"
          variant="outlined"
          style={{ width: '500px', marginTop: '2.5rem' }}
          onChange={ChangeText}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // 엔터를 쳤을때도 검색
              console.log(textWord);
            }
          }}
        />
        <SearchBtn onClick={SendWord}>검 색</SearchBtn>
      </div>
      {isActive ? (
        <SearchDetailBtn onClick={handleDetail}>접 기 ▲</SearchDetailBtn>
      ) : (
        <SearchDetailBtn onClick={handleDetail}>상세검색 ▼</SearchDetailBtn>
      )}

      {isActive ? (
        <SearchDetail>
          {/* 첫줄 */}
          <div
            style={{
              display: 'flex',
              margin: '24px',
            }}
          >
            <KeywordTitle>과일향</KeywordTitle>

            <KeywordGroup>
              <div
                style={{
                  display: 'flex',
                  width: '500px',
                  flexWrap: 'wrap',
                  margin: 'auto',
                }}
              >
                {SelectKeyword1()}
              </div>
              {isMoreState.morebtn1 ? (
                <button
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: '24px',
                  }}
                  onClick={handleMoreBtn1}
                >
                  ▲
                </button>
              ) : (
                <button
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: '24px',
                  }}
                  onClick={handleMoreBtn1}
                >
                  ▼
                </button>
              )}
            </KeywordGroup>
          </div>
          {/* 둘째줄 */}
          <div
            style={{
              display: 'flex',
              margin: '24px',
            }}
          >
            <KeywordTitle>견과류 및 곡물향</KeywordTitle>
            <KeywordGroup>
              <div
                style={{
                  display: 'flex',
                  width: '500px',
                  flexWrap: 'wrap',
                  margin: 'auto',
                }}
              >
                {SelectKeyword2()}
              </div>
              {isMoreState.morebtn2 ? (
                <button
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: '24px',
                  }}
                  onClick={handleMoreBtn2}
                >
                  ▲
                </button>
              ) : (
                <button
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: '24px',
                  }}
                  onClick={handleMoreBtn2}
                >
                  ▼
                </button>
              )}
            </KeywordGroup>
          </div>
        </SearchDetail>
      ) : null}
    </SearchDiv>
  );
};

export default SearchBar;
