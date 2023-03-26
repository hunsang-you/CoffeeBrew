package b305.coffeebrew.server.service;


import b305.coffeebrew.server.dto.review.ReviewRegistDTO;
import b305.coffeebrew.server.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    @Transactional
    public String registReview(ReviewRegistDTO reviewRegistDTO, long idx){
        return "";
    }
    @Transactional
    public String updateReview(long idx){
        return "";
    }
    @Transactional
    public String deleteReview(long idx){
        return "";
    }
}
