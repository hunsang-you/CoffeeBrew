import * as S from '../components/useageStyle';
import { surveyAPI, memberAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Servey1,
  Servey2,
  Servey3,
  Servey4,
  Servey5,
  Servey6,
  Servey7,
  Servey8,
} from '../components/servey';
import tw from 'tailwind-styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, setMemberInfo, RootState } from '../store';

interface IsFooterType {
  setIsFooter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Survey = ({ setIsFooter }: IsFooterType) => {
  const navigate = useNavigate();
  const reduxData = useSelector((state: RootState) => state);
  const [page, setPage] = useState<number>(1);
  const [select, setSelect] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
  const dispatch = useDispatch<AppDispatch>();
  const before = () => {
    if (1 < page && page <= 8) {
      setPage(page - 1);
    }
  };

  const serPost = () => {
    if (page === 8) {
      const postData = select;
      surveyAPI
        .postSurvey(postData)
        .then((request) => {
          memberAPI.memberInfo().then((request) => {
            dispatch(setMemberInfo(request.data.value));
            navigate('/mypage');
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (!reduxData.login) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/');
    }
  });
  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    setIsFooter(true);
  }, [setIsFooter]);
  return (
    <S.ContentContainer>
      <ButDiv>
        <SerButton
          onClick={() => {
            before();
          }}
        >
          이전
        </SerButton>
        {page === 8 ? (
          <SerButton
            onClick={() => {
              serPost();
            }}
          >
            결과 보내기
          </SerButton>
        ) : null}
      </ButDiv>
      {page === 1 ? (
        <Servey1
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 2 ? (
        <Servey2
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 3 ? (
        <Servey3
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 4 ? (
        <Servey4
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 5 ? (
        <Servey5
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 6 ? (
        <Servey6
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 7 ? (
        <Servey7
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : page === 8 ? (
        <Servey8
          page={page}
          setPage={setPage}
          select={select}
          setSelect={setSelect}
        />
      ) : null}
    </S.ContentContainer>
  );
};

export default Survey;

const ButDiv = tw.div`w-full flex justify-between my-10`;
const SerButton = tw.button`text-3xl border mx-5 border-mainOrige hover:bg-mainOrige hover:text-white py-3 px-5 rounded-lg`;
