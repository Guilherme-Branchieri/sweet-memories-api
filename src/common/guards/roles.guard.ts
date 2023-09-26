import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { ROLE } from "@prisma/client";
import { AuthService } from "@/modules/auth/auth.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private authService: AuthService) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const {user} = context.switchToHttp().getRequest()        
        return requiredRoles.some((role) => user?.role?.includes(role));
    }
}