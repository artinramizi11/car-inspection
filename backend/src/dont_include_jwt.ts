import { SetMetadata } from "@nestjs/common";

export const DontIncludeJwt = () => SetMetadata("jwt_not_included", true)