import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { TeamEntity } from 'src/team/entities/team.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async initData() {
    const user1 = new UserEntity();
    user1.username = '用户1';
    user1.email = '111@gmail.com';
    user1.type = '第三方登录——Twitter 登录';

    const user2 = new UserEntity();
    user2.username = '用户2';
    user2.email = '222@gmail.com';
    user2.type = '第三方登录——Github 登录';

    const user3 = new UserEntity();
    user3.username = '用户3';
    user3.email = '333@gmail.com';
    user3.type = '本站注册登录';

    const role1 = new RoleEntity();
    role1.name = '付费用户';

    const role2 = new RoleEntity();
    role2.name = '普通用户';

    const permission1 = new PermissionEntity();
    permission1.name = '生成一个视频';

    const permission2 = new PermissionEntity();
    permission2.name = '从图片生成视频';

    const permission3 = new PermissionEntity();
    permission3.name = '定制化生成视频';

    const permission4 = new PermissionEntity();
    permission4.name = '下载生成视频的某些片段';

    const permission5 = new PermissionEntity();
    permission5.name = '下载生成视频的全部片段';

    const permission6 = new PermissionEntity();
    permission6.name = '分析生成视频的相关性';

    role1.permissions = [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
    ];

    role2.permissions = [permission1, permission2, permission4];

    user1.roles = [role1];
    user2.roles = [role1];
    user3.roles = [role2];

    await this.entityManager.save(PermissionEntity, [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
    ]);

    await this.entityManager.save(RoleEntity, [role1, role2]);

    await this.entityManager.save(UserEntity, [user1, user2, user3]);
  }

  async login(loginUser: UserLoginDto) {
    const user = await this.entityManager.findOne(UserEntity, {
      where: {
        email: loginUser.email,
      },
      relations: {
        roles: true,
        albums: true,
        team: true,
      },
    });

    if (!user) {
      return await this.register(loginUser);
    }

    if (loginUser.email !== user.email) {
      throw new HttpException('邮箱错误', HttpStatus.ACCEPTED);
    }

    return user;
  }

  async register(registerUser: UserRegisterDto) {
    const findUser = await this.findUserByEmail(registerUser.email);

    if (findUser) {
      throw new HttpException('用户已存在', 200);
    }

    const newUser = new UserEntity();
    newUser.email = registerUser.email;
    newUser.username = registerUser.email;
    newUser.image_url =
      'https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/avatar1.jpg';
    newUser.type = 'Website Login';

    const team = new TeamEntity();
    team.name = `${newUser.username}的工作空间`;
    team.members = [];
    newUser.team = [team];

    const role = new RoleEntity();
    role.name = '普通用户';
    newUser.roles = [role];

    try {
      await this.entityManager.save(newUser);

      const registerUser = await this.entityManager.findOne(UserEntity, {
        where: {
          email: newUser.email,
        },
        relations: {
          roles: true,
          albums: true,
          team: true,
        },
      });
      return registerUser;
    } catch (e) {
      return {
        code: 404,
        message: '注册失败',
      };
    }
  }

  async findRolesById(roleIds: number[]) {
    return this.entityManager.find(RoleEntity, {
      where: {
        id: In(roleIds),
      },
      relations: {
        permissions: true,
      },
    });
  }

  async findUserByEmailAndName(email: string, name: string) {
    const user = await this.entityManager.findOneBy(UserEntity, {
      email,
      username: name,
    });

    if (!user) {
      return false;
    }

    return true;
  }

  async findUserByEmail(email: string) {
    const user = await this.entityManager.findOneBy(UserEntity, {
      email,
    });

    if (!user) {
      return false;
    }

    return true;
  }

  async findUserByEmailReturnEntity(email: string) {
    return await this.entityManager.findOne(UserEntity, {
      where: {
        email,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmailAndName(
      createUserDto.email,
      createUserDto.username,
    );

    if (user) {
      throw new HttpException('用户已存在', HttpStatus.CONFLICT);
    }

    return this.entityManager.save(UserEntity, createUserDto);
  }

  async update(updateUserDto: UpdateUserDto) {
    switch (updateUserDto.type) {
      case 'username':
        try {
          await this.entityManager.update(
            UserEntity,
            {
              email: updateUserDto.oldValue,
            },
            {
              username: updateUserDto.newValue,
            },
          );
          return {
            code: 200,
            message: '用户名修改成功!',
          };
        } catch (e) {
          throw new Error(e);
        }
      case 'email':
        try {
          await this.entityManager.update(
            UserEntity,
            {
              username: updateUserDto.oldValue,
            },
            {
              email: updateUserDto.newValue,
            },
          );
          return {
            code: 200,
            message: '用户邮箱修改成功!',
          };
        } catch (e) {
          throw new Error(e);
        }
      default:
        break;
    }
  }

  async updateAvatar(username: string, email: string, url: string) {
    return this.entityManager.update(
      UserEntity,
      {
        username,
        email,
      },
      {
        image_url: url,
      },
    );
  }
}
