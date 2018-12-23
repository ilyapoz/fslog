class StateMachine {
    constructor(init_state) {
        this.state = init_state;
        this.progress = true;
        this.stopped = false;
    }

    process(file) {
        var self = this;
        file.toString().split('\n').forEach(line => {
            do {
                self.progress = true;
                self.state.run(self, line);
            } while (!self.progress && !self.stoped);
        });
    }

    wait() {
        this.progress = false;
        return this;
    }

    stop() {
        this.stoped = true
    }

    transition(state) {
        this.state = state;
    }
}

module.exports = { 
    StateMachine
}
