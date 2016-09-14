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
            <a href="/" class="btn btn-link">Home</a>
            <a href="/get-started" class="btn btn-primary">Get Started</a>
            <a href="#" class="btn btn-link">Log In</a>
            <a href="#" class="btn btn-link">Signup</a>

        </section>
    </header>

    <div class="container" style="text-align: center; margin-top: 2em">
        <h1>Get Started</h1>
        <div id="wireframe-tree" style="margin-top: 2em;">
        </div>

    </div>

    <div class="container"  id="content" style="text-align: center; margin-top: 6em">
        <div class="container" style="margin-top: 2em; text-align: center">
            <div id="wireframe-navbar"> </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div class="modal-body" style="text-align: center;">
                    <img class="" id="wireframe-img-modal" src="" }/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="delete-node" >Delete</button>
                </div>
            </div>
        </div>
    </div>


@endsection