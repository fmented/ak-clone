<div printable>
    <slot></slot>
</div>

<style>
    @media print{
    :global(*){
        visibility: collapse;
    }
    
        :global([printable] *){
            visibility: visible;
    }

    [printable]{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
    }
}
</style>