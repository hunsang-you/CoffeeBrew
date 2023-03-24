package b305.coffeebrew.server.config.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude
@ApiModel("ResponseDTO")
public class ResponseDTO {
	@ApiModelProperty(name="응답 코드", example = "200")
	private HttpStatus status;
	@ApiModelProperty(name="응답 메시지", example = "정상")
	private String message;
	@ApiModelProperty(name="응답값", example = "value")
	private Object value;

	public ResponseDTO(HttpStatus status, String message) {
		this.status = status;
		this.message = message;
	}

	public static ResponseDTO of(HttpStatus status, String message, Object value) {
		return new ResponseDTO(status, message, value);
	}

	public static ResponseDTO of(HttpStatus status, String message) {
		return new ResponseDTO(status, message);
	}

	public static ResponseDTO fail(HttpStatus status, String message) {
		return new ResponseDTO(status, message);
	}
}

