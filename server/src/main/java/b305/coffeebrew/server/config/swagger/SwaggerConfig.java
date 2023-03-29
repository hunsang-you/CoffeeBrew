package b305.coffeebrew.server.config.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	private static final String API_NAME = "B305 Project API";
	private static final String API_VERSION = "0.0.1";
	private static final String API_DESCRIPTION = "B305팀 특화 프로젝트 API 명세서";

	@Bean
	public Docket allApi() {
		String version = "v1";
		return buildDocket("_전체_", Predicates
				.or(PathSelectors.ant("/" + version + "/**")));
	}

	@Bean
	public Docket authApi() {
		String version = "v1";
		return buildDocket("회원 " + version, Predicates
				.or(PathSelectors.ant("/" + version + "/auth/**"),
						PathSelectors.ant("/" + version + "/member"),
						PathSelectors.ant("/" + version + "/member/**")));
	}

	public Docket buildDocket(String groupName, Predicate<String> predicates) {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo()) // API 문서에 대한 설명
//				.securityContexts(Arrays.asList(securityContext())) // swagger에서 jwt 토큰값 넣기위한 설정 1
//				.securitySchemes(Arrays.asList(apiKey())) // swagger에서 jwt 토큰값 넣기위한 설정 2
				.useDefaultResponseMessages(false)
				.groupName(groupName)
				.select()
				.paths(predicates)
				.apis(RequestHandlerSelectors.any())
				.paths(PathSelectors.any())
				.build();
	}

	public ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title(API_NAME)
				.version(API_VERSION)
				.description(API_DESCRIPTION)
				.license("coffeebrew")
				.licenseUrl("https://j8b305.p.ssafy.io")
				.build();
	}

	// swagger에서 jwt 토큰값 넣기위한 설정
	private ApiKey apiKey() {
		return new ApiKey("JWT", "Authorization", "header"); // <type> : JWT
		// return new ApiKey("Bearer", "Authorization", "header"); // <type> : Bearer
	}

	private SecurityContext securityContext() {
		return springfox
				.documentation
				.spi.service
				.contexts
				.SecurityContext
				.builder()
				.securityReferences(defaultAuth()).forPaths(PathSelectors.any()).build();//모든 API 엔드포인트에 적용
	}

	private List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
	}
}
