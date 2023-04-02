package b305.coffeebrew.server.service;


import b305.coffeebrew.server.dto.review.DetailPageReviewResDTO;
import b305.coffeebrew.server.dto.review.ReviewPageDTO;
import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Review;
import b305.coffeebrew.server.exception.ErrorCode;
import b305.coffeebrew.server.exception.MemberNotFoundException;
import b305.coffeebrew.server.exception.ReviewNotFoundException;
import b305.coffeebrew.server.repository.MemberRepository;
import b305.coffeebrew.server.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    @Transactional
    public Long registReview(ReviewPageDTO reviewPageDTO, Long idx) throws RuntimeException{
        Member member = memberRepository.findById(idx).orElseThrow(() -> new MemberNotFoundException(ErrorCode.MEMBER_NOT_FOUND));
        log.info("service review = {}", member.getIdx());
        reviewRepository.save(reviewPageDTO.of(member));
        return member.getIdx();
    }

    @Transactional
    public List<DetailPageReviewResDTO> readReview(String itemType, String itemIdx) throws RuntimeException{
        List<Review> reviews = reviewRepository.findByItemTypeAndItemIdx(itemType, Long.parseLong(itemIdx));
        List<DetailPageReviewResDTO> reviewDTO = new ArrayList<>();
        for (Review review : reviews) {
            reviewDTO.add(new DetailPageReviewResDTO(review));
        }
        return reviewDTO;
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
    public Page<Review> readReview(long memberIdx, Pageable pageable) throws RuntimeException {
        Member member = new Member();
        member.setIdx(memberIdx);
        Page<Review> reviewPage = reviewRepository.findByMemberIdx(member, pageable);
        return reviewPage;
    }
}
