package b305.coffeebrew.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "token")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {

    @Id
    @Column(name = "member_id")
    private String memberId;

    private String refreshToken;

}