import tw from 'tailwind-styled-components';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import Logo from '../../assets/Coffeebrew.svg';
import { CapsuleResponseType } from './CapsuleList';
import { listAPI } from '../../api/api';
import { text } from 'stream/consumers';
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
  pagination: CapsuleResponseType | null;
  setPagination: React.Dispatch<
    React.SetStateAction<CapsuleResponseType | null>
  >;
  setWords: React.Dispatch<React.SetStateAction<Array<string>>>;
  words: string[];
}

const CapsuleSearchBar = ({
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
  };
  // 단어 전송
  const SendWord = (e: any) => {
    // 엔터 and 검색 버튼 클릭시 전송
    const getPages = async (words: string[]) => {
      await listAPI
        .getCapsules(...words)
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
          newWords = [...newWords, `keywords=${keywordsFruits[i]}`];
        }
      }
      const keys2 = Object.keys(isKeywordState2);
      for (let i = 0; i < keys2.length; i++) {
        const key = keys2[i];
        if (isKeywordState2[key]) {
          newWords = [...newWords, `keywords=${keywordsNuts[i]}`];
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
  });

  const [isKeywordState2, setIsKeywordState2] = useState<KeywordState2>({
    keyword0: false,
    keyword1: false,
    keyword2: false,
    keyword3: false,
    keyword4: false,
    keyword5: false,
    keyword6: false,
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
  type KeywordsFruits = {
    [key: number]: string;
  };

  const keywordsFruits: KeywordsFruits = {
    0: '캡슐인가',
    1: '사과',
    2: '열대과일',
    3: '베리',
    4: '말린 과일',
    5: '멜론',
    6: '포도',
  };
  type KeywordsNuts = {
    [key: number]: string;
  };

  const keywordsNuts: KeywordsNuts = {
    0: '아몬드',
    1: '헤이즐넛',
    2: '땅콩',
    3: '보리',
    4: '호밀',
    5: '스모키',
    6: '맥아',
  };

  // 첫번째(keywordsFruits) 렌더링
  const SelectKeyword1 = () => {
    const keywordEntries = Object.entries(keywordsFruits);

    return keywordEntries.map(([key, value]: string[]) => {
      for (let i = 0; i < Object.keys(keywordsFruits).length + 1; i++) {
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

  // 두번째(keywordsNuts) 렌더링
  const SelectKeyword2 = () => {
    const keywordEntries = Object.entries(keywordsNuts);

    return keywordEntries.map(([key, value]: string[]) => {
      for (let i = 0; i < Object.keys(keywordsNuts).length + 1; i++) {
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

  return (
    <SearchDiv>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}
      >
        <img src={Logo} alt="Logo" width={100} style={{ marginTop: '24px' }} />
        <TextField
          id="outlined-basic"
          label="캡슐 이름 입력"
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

export default CapsuleSearchBar;
