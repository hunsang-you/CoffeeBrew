//package b305.coffeebrew.server.dto.member;
//
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.List;
//
///**
// * 추후 마이페이지 구성을 위해 넣어둔 예시 코드
// *
// */
//
//@Getter
//@Setter
//@NoArgsConstructor
//public class MemPageResDTO {
//    private Integer coin;
//    private List<MemPageDealDTO> memPageDealDTOReqList;
//    private List<MemPageDealDTO> memPageDealDTOResList;
//
//    @Builder
//    public MemPageResDTO(Integer coin, List<MemPageDealDTO> memPageDealDTOReqList, List<MemPageDealDTO> memPageDealDTOResList) {
//        this.coin = coin;
//        this.memPageDealDTOResList = memPageDealDTOReqList;
//        this.memPageDealDTOReqList = memPageDealDTOResList;
//    }
//
//    public MemPageResDTO of(Coin coin, List<MemPageDealDTO> memPageDealDTOReqList, List<MemPageDealDTO> memPageDealDTOResList) {
//        return MemPageResDTO.builder().coin(coin.getCoin()).memPageDealDTOReqList(memPageDealDTOReqList).memPageDealDTOResList(memPageDealDTOResList).build();
//    }
//}
