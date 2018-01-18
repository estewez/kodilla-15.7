class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            watch: ''
        };
    }
    format = (times) => {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    start = () => {
        if (!this.state.running) {
            this.state.running = true;
            this.state.watch = setInterval(() => this.step(), 10);
        }
    }
    step = () => {
        if (!this.state.running) return;
        this.calculate();
    }
    calculate = () => {
        const copy = this.state.times;
        copy.miliseconds = this.state.times.miliseconds + 1
        this.setState({times: copy});
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
        this.render();
    }
    stop = () => {
        this.state.running = false;
        clearInterval(this.state.watch);
    }
    reset = () => {
        let copy = this.state.times;
        copy.minutes = 0;
        copy.seconds = 0;
        copy.miliseconds = 0;
        this.setState({times: copy});
    }
    add = () => {
        var li = document.createElement('li');
        li.innerText = this.format(this.state.times);
        document.querySelector('.results').appendChild(li);
    }
    resetList = () => {
        while (document.querySelector('.results').firstChild) {
            document.querySelector('.results').firstChild.remove();
        }
    }
    render() {
        return (
            <div className='app'>
                <nav className={'controls'}>
                    <a href={'#'} className={'button'} onClick={this.start}>
                        {'Start'}
                    </a>
                    <a href={'#'} className={'button'} onClick={this.stop}>
                        {'Stop'}
                    </a>
                    <a href={'#'} className={'button'} onClick={this.reset}>
                        {'Reset'}
                    </a>
                    <a href={'#'} className={'button'} onClick={this.add}>
                        {'Add'}
                    </a>
                </nav>
                <div className={'stopwatch'}>
                    {this.format(this.state.times)}
                </div>
                <div className={'controls'}>
                    <a href={'#'} className={'button'} onClick={this.resetList}>
                        {'Reset list'}
                    </a>
                </div>
                <ul className={'results'}>
                </ul>
            </div>
        );
    }
}

var stoper = React.createElement(Stopwatch);
ReactDOM.render(stoper, document.getElementById('app'));

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}