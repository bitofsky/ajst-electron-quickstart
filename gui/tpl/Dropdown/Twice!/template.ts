import { $ } from '../../../lib/lib';

export default (data: any) => {

    $('#Twice [data-toggle="tab"]').on('shown.bs.tab', (event) => {
        $('#Twice iframe').remove();
        const youtube = $(event.target).data('youtube');
        $(`#Twice #${youtube}`).append(`<iframe src="https://www.youtube.com/embed/${youtube}?autoplay=1" frameborder="0" allowfullscreen></iframe>`);
    });

    $('#Twice [data-toggle="tab"]:first').tab('show');

};
