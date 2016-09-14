@extends('layout')

@section('content')

    <header class="navbar">
        <section class="navbar-section">
            <a href="#" class="btn btn-link btn-lg">
                <i class="icon icon-people"></i>
            </a>
            <a href="#" class="navbar-brand">Project Spec</a>
        </section>
        <section class="navbar-section">
            <a href="#" class="btn btn-primary">Home</a>
            <a href="/get-started" class="btn btn-link">Get Started</a>
            <a href="#" class="btn btn-link">Log In</a>
            <a href="#" class="btn btn-link">Signup</a>

        </section>
    </header>

    <div class="container" style="text-align: center; margin-top: 2em">
        <div class="starter-template">
            <h1>Project Spec</h1>
            <div id="myDiv">
                <script type="text/babel">

                    ReactDOM.render(
                            <h1>Hello, world!</h1>,
                            document.getElementById('myDiv')
                    );
                </script>
            </div>
        </div>
    </div><!-- /.container -->

@endsection