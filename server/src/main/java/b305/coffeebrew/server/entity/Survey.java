package b305.coffeebrew.server.entity;

import b305.coffeebrew.server.config.utils.BaseAtTime;
import b305.coffeebrew.server.config.utils.BooleanToYNConverter;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "survey")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Survey extends BaseAtTime implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    // 회원 식별
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_idx")
    private Member memberIdx;

    @Column(name = "result_code")
    private String resultCode;

    @Column(name = "result_type")
    private String resultType;

    private int param1;
    private int param2;
    private int param3;
    private int param4;
    private int param5;
    private int param6;
    private int param7;
    private int param8;

    private int flavor; // 향미
    private int acidity; // 산미
    private int sweetness; // 단맛
    private int bitterness; // 쓴맛
    private int body; // 바디감

    private String coffeeing_note; // 커핑노트(향 상세)

    @Convert(converter = BooleanToYNConverter.class)
    private boolean expired;

    @Override
    public void prePersist() {
        super.prePersist();
    }

}
