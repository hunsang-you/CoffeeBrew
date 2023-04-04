package b305.coffeebrew.server.repository;

import b305.coffeebrew.server.entity.Member;
import b305.coffeebrew.server.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    Optional<Survey> findByMemberIdx(Member member);
}
