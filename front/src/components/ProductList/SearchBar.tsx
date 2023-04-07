import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import Logo from '../../assets/Coffeebrew.svg';
import { BeanResponseType } from './AllList';
import { listAPI } from '../../api/api';
// 검색창
const SearchDiv = tw.div`flex flex-col text-center `;
const SearchBtn = tw.button`w-20 h-12 bg-nameColor text-white rounded-full mx-4 mt-10 font-bold`;
const SearchDetailBtn = tw.button`w-28 h-12 bg-grinding1 text-black rounded-xl mt-4 mx-auto font-bold`;
const SearchDetail = tw.div`w-720 min-h-full border-4 rounded-3xl border-y-brownBorder mx-auto mt-4 drop-shadow-lg `;
const CheckKeyword = tw.button`w-20 border-4 border-nameColor text-black rounded-2xl ml-4 mr-4 mt-2 mb-2 font-bold `;
const CheckedKeyword = tw.button`w-20 border-4 border-nameColor bg-nameColor text-white rounded-2xl ml-4 mr-4 mt-2 mb-2 font-bold  `;

const KeywordTitle = tw.div`w-20 text-xl font-bold mx-auto my-auto break-words`;
const KeywordGroup = tw.div`w-592 mx-auto border-4 border-recMachine2 rounded-2xl flex `;

interface PropsTypes {
  pagination: BeanResponseType | null;
  setPagination: React.Dispatch<React.SetStateAction<BeanResponseType | null>>;
  setWords: React.Dispatch<React.SetStateAction<Array<string>>>;
  words: string[];
}

const SearchBar = ({
  pagination,
  setPagination,
  setWords,
  words,
}: PropsTypes) => {
  interface KeywordState1 {
    [key: string]: boolean;
    keyword0: boolean;
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
    keyword0: boolean;
    keyword1: boolean;
    keyword2: boolean;
    keyword3: boolean;
    keyword4: boolean;
    keyword5: boolean;
    keyword6: boolean;
    keyword7: boolean;
  }
  interface KeywordState3 {
    [key: string]: boolean;
    keyword0: boolean;
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
    morebtn3: boolean;
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
  };
  // 단어 전송
  const SendWord = (e: any) => {
    // 엔터 and 검색 버튼 클릭시 전송
    const getPages = async (words: string[]) => {
      await listAPI
        .getBeans(...words)
        .then((request) => {
          setPagination(request.data.value);
          console.log(request.data.value);
        })
        .catch((e) => console.log(e));
    };
    setWords((prevWords) => {
      let newWords = [`page=${0}`];
      const keys1 = Object.keys(isKeywordState1);
      for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        if (isKeywordState1[key]) {
          newWords = [...newWords, `keywords=${keywordsType[i]}`];
        }
      }
      const keys2 = Object.keys(isKeywordState2);
      for (let i = 0; i < keys2.length; i++) {
        const key = keys2[i];
        if (isKeywordState2[key]) {
          newWords = [...newWords, `keywords=${keywordsSweet[i]}`];
        }
      }
      const keys3 = Object.keys(isKeywordState3);
      for (let i = 0; i < keys3.length; i++) {
        const key = keys3[i];
        if (isKeywordState3[key]) {
          newWords = [...newWords, `keywords=${keywordsFlavor[i]}`];
        }
      }
      if (textWord.length > 0) {
        newWords = [...newWords, `keywords=${textWord}`];
      }

      getPages(newWords);
      return newWords;
    });
  };

  // 상세검색 키워드 관리
  // 키워드 on off
  const [isKeywordState1, setIsKeywordState1] = useState<KeywordState1>({
    keyword0: false,
    keyword1: false,
    keyword2: false,
    keyword3: false,
    keyword4: false,
    keyword5: false,
    keyword6: false,
    keyword7: false,
  });

  const [isKeywordState2, setIsKeywordState2] = useState<KeywordState2>({
    keyword0: false,
    keyword1: false,
    keyword2: false,
    keyword3: false,
    keyword4: false,
    keyword5: false,
    keyword6: false,
    keyword7: false,
  });
  const [isKeywordState3, setIsKeywordState3] = useState<KeywordState3>({
    keyword0: false,
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
  const handleKeyword2 = (keyword: keyof KeywordState2 | string): void => {
    if (typeof keyword === 'string' && keyword.startsWith('keyword')) {
      setIsKeywordState2({
        ...isKeywordState2,
        [keyword]: !isKeywordState2[keyword as keyof KeywordState2],
      });
    }
  };
  const handleKeyword3 = (keyword: keyof KeywordState3 | string): void => {
    if (typeof keyword === 'string' && keyword.startsWith('keyword')) {
      setIsKeywordState3({
        ...isKeywordState3,
        [keyword]: !isKeywordState3[keyword as keyof KeywordState3],
      });
    }
  };
  // 항목 더보기 on off
  const [isMoreState, setIsMoreState] = useState<MoreState>({
    morebtn1: false,
    morebtn2: false,
    morebtn3: false,
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
  const handleMoreBtn3 = () => {
    setIsMoreState({
      ...isMoreState,
      morebtn3: !isMoreState.morebtn3,
    });
  };

  // 예시
  type KeywordsType = {
    [key: number]: string;
  };

  const keywordsType: KeywordsType = {
    0: '고소한',
    1: '부드러운',
    2: '달콤한',
    3: '풍부한',
    4: '깔끔한',
    5: '균형잡힌',
    6: '가벼운',
    7: '깊은',
  };
  type KeywordsSweet = {
    [key: number]: string;
  };

  const keywordsSweet: KeywordsSweet = {
    0: '초코',
    1: '다크초코',
    2: '밀크초코',
    3: '갈색설탕',
    4: '조청',
    5: '허니',
    6: '복숭아',
  };

  type KeywordsFlavor = {
    [key: number]: string;
  };

  const keywordsFlavor: KeywordsFlavor = {
    0: '오렌지',
    1: '아몬드',
    2: '견과류',
    3: '카라멜',
    4: '플로럴',
    5: '스모크',
    6: '시트러스',
    7: '과일',
  };

  // 첫번째(keywordsType) 렌더링
  const SelectKeyword1 = () => {
    const keywordEntries = Object.entries(keywordsType);

    return keywordEntries.map(([key, value]: string[]) => {
      for (let i = 0; i < Object.keys(keywordsType).length + 1; i++) {
        if (isMoreState.morebtn1 === false && parseInt(key) === i && i < 4) {
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
          i >= 0
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

  // 두번째(keywordsSweet) 렌더링
  const SelectKeyword2 = () => {
    const keywordEntries = Object.entries(keywordsSweet);

    return keywordEntries.map(([key, value]: string[]) => {
      for (let i = 0; i < Object.keys(keywordsSweet).length + 1; i++) {
        if (isMoreState.morebtn2 === false && parseInt(key) === i && i < 4) {
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
          i >= 0
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

  const SelectKeyword3 = () => {
    const keywordEntries = Object.entries(keywordsFlavor);

    return keywordEntries.map(([key, value]: string[]) => {
      for (let i = 0; i < Object.keys(keywordsFlavor).length + 1; i++) {
        if (isMoreState.morebtn3 === false && parseInt(key) === i && i < 4) {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
              {isKeywordState3['keyword' + key] ? (
                <CheckedKeyword
                  key={value}
                  onClick={() => handleKeyword3('keyword' + key)}
                >
                  {value}
                </CheckedKeyword>
              ) : (
                <CheckKeyword
                  key={value}
                  onClick={() => handleKeyword3('keyword' + key)}
                >
                  {value}
                </CheckKeyword>
              )}
            </div>
          );
        } else if (
          isMoreState.morebtn3 === true &&
          parseInt(key) === i &&
          i >= 0
        ) {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
              {isKeywordState3['keyword' + key] ? (
                <CheckedKeyword
                  key={value}
                  onClick={() => handleKeyword3('keyword' + key)}
                >
                  {value}
                </CheckedKeyword>
              ) : (
                <CheckKeyword
                  key={value}
                  onClick={() => handleKeyword3('keyword' + key)}
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
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}
      >
        <img src={Logo} alt="Logo" width={100} style={{ marginTop: '24px' }} />
        <TextField
          id="outlined-basic"
          label="원두 이름 입력"
          variant="outlined"
          style={{
            width: '500px',
            marginTop: '2.5rem',
          }}
          onChange={ChangeText}
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
            {/* <KeywordTitle>과일향</KeywordTitle> */}

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
            {/* <KeywordTitle>견과류 및 곡물향</KeywordTitle> */}
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
          {/* 세번째줄 */}
          <div
            style={{
              display: 'flex',
              margin: '24px',
            }}
          >
            {/* <KeywordTitle>견과류 및 곡물향</KeywordTitle> */}
            <KeywordGroup>
              <div
                style={{
                  display: 'flex',
                  width: '500px',
                  flexWrap: 'wrap',
                  margin: 'auto',
                }}
              >
                {SelectKeyword3()}
              </div>
              {isMoreState.morebtn3 ? (
                <button
                  style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: '24px',
                  }}
                  onClick={handleMoreBtn3}
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
                  onClick={handleMoreBtn3}
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
