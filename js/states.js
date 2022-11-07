import { InputHandler } from "./input.js"
import { Dust, Fire, Splash} from "./particles.js"

{InputHandler}

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUNPING: 2,
    FALLING: 3,
    STANDING: 4,
    ROLLING: 5,
    DIVING: 6,
    HIT: 7,
}

class State {
    constructor(state, game){
        this.game = game
        this.state = state
        this.last = new InputHandler()
    }
}

export class Sitting extends State {
    constructor(game){
        super('SITTING', game)
    }
    enter(){
        this.game.player.frameX = 0
        this.game.player.maxFrame = 4
        this.game.player.frameY = 5
    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 2)
        }else if(input.includes('ArrowUp')) this.game.player.setState(states.JUNPING, 3)
        else if(this.last.lastKey.includes('ArrowDown')) this.game.player.setState(states.STANDING,0)
        else if(input.includes('a')) {
            this.game.player.setState(states.ROLLING,2)
        }
    }
}

export class Running extends State {
    constructor(game){
        super('RUNNING', game)
    }
    enter(){
        this.game.player.frameX = 0
        this.game.player.maxFrame = 8
        this.game.player.frameY = 3
    }
    handleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height))
        if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUNPING, 3)
        }else if(this.last.lastKey.includes('ArrowLeft') || this.last.lastKey.includes('ArrowRight')){
            this.game.player.setState(states.STANDING, 0)
        }else if(input.includes('a')) {
            this.game.player.setState(states.ROLLING,2)
        } 
    }
}

export class Junping extends State {
    constructor(game){
        super('JUNPING', game)
    }
    enter(){
        if (this.game.player.onGround()) this.game.player.vy -= 20
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 1
    }
    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 3)
        } else if(input.includes('a')) {
            this.game.player.setState(states.ROLLING,2)
        } else if(input.includes('ArrowDown'))
            this.game.player.setState(states.DIVING,0)
    }
}

export class Falling extends State {
    constructor(game){
        super('FALLING', game)
    }
    enter(){
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 2
    }
    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.STANDING, 0)
        } else if(input.includes('ArrowDown'))
            this.game.player.setState(states.DIVING,0)
    }
}

export class Standing extends State {
    constructor(game){
        super('STANDING', game)
    }
    enter(){
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 0
    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 2)
        } else if (input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING, 0)
        }else if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUNPING, 3)
        } else if(input.includes('a')) {
            this.game.player.setState(states.ROLLING,2)
        }
    }
}

export class Rolling extends State {
    constructor(game){
        super('ROLLING', game)
    }
    enter(){
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 6
    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height * 0.5))
        if(!input.includes('a') && this.game.player.onGround()){
            this.game.player.setState(states.STANDING, 0)
        } else if(!input.includes('a') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1)
        } else if(input.includes('a') && input.includes('ArrowUp')&& this.game.player.onGround()){
            this.game.player.vy -=26
        } else if(input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.DIVING,0)
        }
    }
}
export class Diving extends State {
    constructor(game){
        super('DIVING', game)
    }
    enter(){
        this.game.player.frameX = 0
        this.game.player.maxFrame = 6
        this.game.player.frameY = 6
        this.game.player.vy = 15
    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height * 0.5))
        if(this.game.player.onGround()){
            this.game.player.setState(states.STANDING, 0)
            for(let i = 0; i < 30; i++){
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height))
            }
        } else if(input.includes('a') && this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1)
        }
    }
}

export class Hit extends State {
    constructor(game){
        super('HIT', game)
    }
    enter(){
        this.game.player.frameX = 0
        this.game.player.maxFrame = 10
        this.game.player.frameY = 4
    }
    handleInput(input){
        if(this.game.player.frameX >= 10 && this.game.player.onGround()){
            this.game.player.setState(states.STANDING, 0)
        } else if(this.game.player.frameX >= 10 && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1)
        }
    }
}