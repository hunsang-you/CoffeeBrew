package b305.coffeebrew.server.service;

import b305.coffeebrew.server.dto.review.DetailPageReviewResDTO;
import b305.coffeebrew.server.dto.review.MyPageReviewResDTO;
import b305.coffeebrew.server.dto.review.ReviewPageDTO;
import b305.coffeebrew.server.dto.review.ReviewResDTO;
import b305.coffeebrew.server.entity.Bean;
import b305.coffeebrew.server.entity.Capsule;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Review;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MemberNotFoundException;
import b305.coffeebrew.server.exception.ReviewNotFoundException;
import b305.coffeebrew.server.repository.BeanRepository;
import b305.coffeebrew.server.repository.CapsuleRepository;
import b305.coffeebrew.server.repository.MemberRepository;
import b305.coffeebrew.server.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final BeanRepository beanRepository;
    private final CapsuleRepository capsuleRepository;
    @Transactional
    public Long registReview(ReviewPageDTO reviewPageDTO, Long idx) throws RuntimeException{
        Member member = memberRepository.findById(idx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        log.info("service단 ItemIdx = {}", reviewPageDTO.getItemIdx());
        reviewRepository.save(reviewPageDTO.of(member));
        return member.getIdx();
    }

    @Transactional
    public List<ReviewResDTO> readReview(String itemType, Long itemIdx) {
        List<Review> reviews = reviewRepository.findByItemTypeAndItemIdxAndExpiredIsFalseOrderByCreatedDateDesc(itemType, itemIdx);
        return reviews.stream().map(ReviewResDTO::of).collect(Collectors.toList());
    }

    @Transactional
    public Long updateReview(String reviewId, ReviewPageDTO reviewPageDTO, Long idx) throws RuntimeException{
        Review review = reviewRepository.findById(Long.valueOf(reviewId)).orElseThrow(() -> new ReviewNotFoundException(ErrorCode.REVIEW_NOT_FOUND));
        if (!idx.equals(review.getMemberIdx().getIdx())){
            throw new ReviewNotFoundException(ErrorCode.REVIEW_NOT_EQUAL);
        }
        review.update(reviewPageDTO);
        reviewRepository.save(review);
        return review.getIdx();
    }
    @Transactional
    public Long deleteReview(String reviewId, Long idx) throws RuntimeException {
        Review review = reviewRepository.findById(Long.valueOf(reviewId)).orElseThrow(() -> new ReviewNotFoundException(ErrorCode.REVIEW_NOT_FOUND));
        if (!idx.equals(review.getMemberIdx().getIdx())){
            throw new ReviewNotFoundException(ErrorCode.REVIEW_NOT_EQUAL);
        }
        // 사옹자 expired로 변경
        review.setExpired(true);
        reviewRepository.save(review);
        return review.getIdx();
    }

    /**
     * 사용자 리뷰 목록 조회
     */
    @Transactional
    public Page<MyPageReviewResDTO> readMyPageReview(long memberIdx, Pageable pageable) throws RuntimeException {
        Member member = new Member();
        member.setIdx(memberIdx);
        Page<Review> reviews = reviewRepository.findByMemberIdxAndExpiredIsFalseOrderByCreatedDateDesc(member, pageable);
        List<MyPageReviewResDTO> myPageReviewResDTOs = new ArrayList<>();
        String itemType = reviews.getContent().get(0).getItemType();
        for (Review review : reviews) {
            if("bean".equals(review.getItemType())){
                String itemName = beanRepository.findByIdx( review.getItemIdx()).getNameKo();
                myPageReviewResDTOs.add(MyPageReviewResDTO.of(review, itemName));
            }else {
                String itemName = capsuleRepository.findByIdx(review.getItemIdx()).getNameKo();
                myPageReviewResDTOs.add(MyPageReviewResDTO.of(review, itemName));
            }

            }
        return new PageImpl<>(myPageReviewResDTOs, reviews.getPageable(), reviews.getTotalElements());
    }

    /**
     * 시간마다 원두 유저 데이터 갱신
     */
    @Transactional
    public void updateUserGradeFromReviews(String itemType) {

        List<Review> beanReviews = reviewRepository.findByItemType(itemType);
        Map<Long, List<Integer>> overallMap = new HashMap<>();

        // 각 원두의 전체 총점과 리뷰 수를 계산합니다.
        for (Review review : beanReviews) {
            Long beanIdx = review.getItemIdx();
            int overall = review.getOverall();

            List<Integer> overallList = overallMap.get(beanIdx);
            if (overallList == null) {
                overallList = new ArrayList<>();
                overallMap.put(beanIdx, overallList);
            }
            overallList.add(overall);
        }
        //bean
        if ("bean".equals(itemType)){
            // 각 원두의 사용자 평점(userGrade)을 계산하고 업데이트합니다.
            for (Long beanIdx : overallMap.keySet()) {
                List<Integer> overallList = overallMap.get(beanIdx);
                int overallSum = 0;
                for (int overall : overallList) {
                    overallSum += overall;
                }
                double overallAvg = (double) overallSum / overallList.size();
                int userGrade = (int) Math.round(overallAvg);

                Optional<Bean> optionalBean = beanRepository.findById(beanIdx);
                if (optionalBean.isPresent()) {
                    Bean bean = optionalBean.get();
                    bean.setUserGrade(userGrade);
                    beanRepository.save(bean);
                }
            }
        }else{//capsule
            // 각 원두의 사용자 평점(userGrade)을 계산하고 업데이트합니다.
            for (Long beanIdx : overallMap.keySet()) {
                List<Integer> overallList = overallMap.get(beanIdx);
                int overallSum = 0;
                for (int overall : overallList) {
                    overallSum += overall;
                }
                double overallAvg = (double) overallSum / overallList.size();
                int userGrade = (int) Math.round(overallAvg);

                Optional<Capsule> optionalCapsule = capsuleRepository.findById(beanIdx);
                if (optionalCapsule.isPresent()) {
                    Capsule capsule = optionalCapsule.get();
                    capsule.setUserGrade(userGrade);
                    capsuleRepository.save(capsule);
                }
            }
        }

    }

}
