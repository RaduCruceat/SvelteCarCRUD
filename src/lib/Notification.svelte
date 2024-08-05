<script lang="ts">
    import { notification } from '$lib/notificationStore';
    </script>
    
    {#if $notification}
      <div class="notification">
        {$notification}
      </div>
    {/if}
    
    <style>
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 16px;
        border-radius: 4px;
        z-index: 1000;
      }
    </style>