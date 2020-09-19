import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from '@nx-themed-bolierplate/shared/data-access';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>
  ) {}

  async login(username: string, password: string) {
    const user = await this.authRepository.findOne({ where: { username } });

    if (!user) {
      throw new Error('No user with that username');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Incorrect password');
    }

    // return json web token
    return jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

  async register(username: string, password: string, email: string) {
    const user = await this.authRepository.findOne({
      where: { username, email },
    });
    if (user) {
      throw new Error('No user with that username/email already exists.');
    }

    const newuser = this.authRepository.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // return json web token
    return jsonwebtoken.sign(
      { id: newuser.id, email: newuser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    );
  }
}
